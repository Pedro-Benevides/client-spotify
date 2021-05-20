import React from 'react';
import useAut from './useAut'

export default function Dashboard({code}){
    const tokenAcesso = useAut(code)
    return <div>{code}</div>
}