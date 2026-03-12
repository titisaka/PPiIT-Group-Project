import { useEffect, useState } from "react"

interface Item {
    _id: number
    "item-name": string
    price : number
    barcode: number
    vendor: string 
}

export default function App(){

    const [items, setItems] = useState<Item[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log("useEffect()")
        fetch("/api/items", {
            method: "GET"
        })
        .then((res : Response) => {
            if(!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            return res.json()
        })
        .then((jsonData : Item[]) => { 
            if(!jsonData || !jsonData.length) {
                //setItem placeholder or render alternative object
            }
            setItems(jsonData)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(true)
        })
    },[])

    if (isLoading) {
        return <h1>LOADING...</h1>
    } else {
        return <>
                <div className="grid item-list">
                    {items.map((item:Item)=> 
                        <div key={item._id} className="row item-row"> 
                            <div className="col">
                                {item["item-name"]}
                            </div>
                            <div className="col">
                                {item.barcode}
                            </div>
                            <div className="col">
                                {item.vendor}
                            </div>
                            <div className="col">
                                {item.price}
                            </div>
                        </div>
                    )}
                </div>
            </>
    }
}
