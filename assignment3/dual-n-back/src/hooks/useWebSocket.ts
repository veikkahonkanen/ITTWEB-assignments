import { useRef, useState, useEffect } from "react";

const timeoutInitial= 250;
//https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
// 4000-4999 is reserved for application use
const endWsCode = 4000;
export type WebSocketMessage = string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;
/**
 * Hook to connect to a web socket.
 * Uses exponential backoff to try to recconnect in case of failure 
 * @param url Url of the websocket
 */
export function useJSONWebSocket<T>(url:string): [T | undefined, (d: T) => boolean]{
    const refTimeout = useRef(timeoutInitial);
    const [websocket, setWs] = useState<WebSocket>();
    const [lastData, setLastData] = useState<T>();

    const check = (url: string, ws: WebSocket) => {
        return () => {
            if(!ws || ws.readyState === WebSocket.CLOSED) connect(url)
        };
    }

    const connect = (url: string): WebSocket => {
        const ws = new WebSocket(url);
        setWs(ws);
        
        var connectInterval: NodeJS.Timeout;
        ws.onopen = () => {

            refTimeout.current = timeoutInitial;
            clearTimeout(connectInterval);
        }
        ws.onclose = e => {
            // User wants a different ws
            if(e.code === endWsCode){
                clearInterval(connectInterval);
                return;
            }
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (refTimeout.current *2) / 1000
                )} second.`,
                e.reason
            );
            refTimeout.current = refTimeout.current * 2;
            connectInterval = setTimeout(check(url, ws), Math.min(10000, refTimeout.current));
        }

        ws.onmessage = (ev: MessageEvent) => {
            setLastData(JSON.parse(ev.data));
        };

        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err,
                "Closing socket"
            );

            ws.close();
        }
        return ws;
    }
    useEffect(() =>{
        if(!url) return;
        setWs(connect(url));
        return () => {
            setWs(ws => {
                ws?.close(endWsCode);
                return undefined;  
            });
        }
    }, [url]);

    const sendData = (data: T): boolean => {
        if(!!websocket && websocket.readyState === WebSocket.OPEN){
            websocket.send(JSON.stringify(data));
            return true;
        }
        return false;
    }
    return [lastData, sendData];
}