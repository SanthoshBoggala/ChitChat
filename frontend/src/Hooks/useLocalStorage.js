import { useEffect, useState } from 'react'

const prefixKey = "chitChat-"

const useLocalStorage = ({ key, initialValue })=>{
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(`${prefixKey+key}`)
        return storedData ? JSON.parse(storedData) : initialValue
    })


    useEffect(()=>{
        localStorage.setItem(`${prefixKey+key}`, JSON.stringify(data))
    },[key, data])

    return [data, setData]
}

export default useLocalStorage