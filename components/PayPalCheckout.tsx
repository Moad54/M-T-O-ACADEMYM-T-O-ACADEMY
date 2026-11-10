 "use client";
import {useEffect,useRef,useState} from "react";
declare global{interface Window{paypal?:any}}
export default function PayPalCheckout({planId,planName}:{planId:string;planName:string}){
 const ref=useRef<HTMLDivElement>(null);const [msg,setMsg]=useState("Paiement sécurisé via PayPal");
 useEffect(()=>{const cid=process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;if(!cid){setMsg("Ajoutez vos identifiants PayPal pour activer le paiement.");return}let stop=false;
 const render=()=>{if(stop||!window.paypal||!ref.current)return;ref.current.innerHTML="";window.paypal.Buttons({style:{layout:"vertical",color:"gold",shape:"rect",label:"paypal"},
 createOrder:async()=>{const r=await fetch("/api/paypal/create-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({planId})});const d=await r.json();if(!r.ok)throw Error(d.error);return d.orderID},
 onApprove:async(data:{orderID:string})=>{setMsg("Vérification du paiement...");const r=await fetch("/api/paypal/capture-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderID:data.orderID,planId})});const d=await r.json();setMsg(r.ok?`Paiement confirmé (${planName}) — ${d.captureID}. ${d.message}`:d.error)},
 onCancel:()=>setMsg("Paiement annulé."),onError:()=>setMsg("Erreur PayPal. Veuillez réessayer.")
 }).render(ref.current)};
 if(window.paypal)render();else{let s=document.getElementById("paypal-sdk") as HTMLScriptElement|null;if(!s){s=document.createElement("script");s.id="paypal-sdk";s.src=`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(cid)}&currency=EUR&intent=capture`;s.onload=render;document.body.appendChild(s)}else s.addEventListener("load",render,{once:true})}
 return()=>{stop=true}},[planId,planName]);return <div className="pay"><div ref={ref}/><small aria-live="polite">{msg}</small></div>
}