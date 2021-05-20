import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useAut(code) {
    const [tokenAcesso, setTokenAcesso] = useState()
    const [tokenAtt, setTokenAtt] = useState()
    const [expiraEm, setExpiraEm] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', { code }).then(res => {
            setTokenAcesso(res.data.tokenAcesso)
            setTokenAtt(res.data.tokenAtt)
            setExpiraEm(res.data.expiraEm)
            window.history.pushState({}, null, '/')
        }).catch(() => {
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!tokenAtt || !expiraEm) return
        const intervalo = setInterval(()=>{
            axios.post('http://localhost:3001/refresh', { tokenAtt }).then(res => {
                setTokenAcesso(res.data.tokenAcesso)
                setExpiraEm(res.data.expiraEm)
            }).catch(() => {
                window.location = '/'
            })
        },(expiraEm - 60)*1000)
        return () => clearInterval(intervalo)
    }, [tokenAtt, expiraEm])

    return tokenAcesso
}