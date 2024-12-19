import React, { useEffect, useState } from 'react'
import './Service.css'

function Services() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [searchQuery,setSearchQuery]=useState('');


    // console.log("Service Name",data[0].service_name)

    useEffect(() => {
        const fetchservicesdata = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://20.193.149.47:2242/salons/service/')
                const fetcheddata = await response.json();
                setData(fetcheddata.results);
                setIsLoading(false);
            } catch (error) {
                throw new error
            }
        }
        fetchservicesdata();
    }, [])

    console.log('Fetch Data', data);


    const handleSearch=(search)=>{
        const filteredData= data.filter((value)=>(
            value.service_name === search
        ))
        setData(filteredData)      
    }

    return (
        <div>
            <div className="heading">
                <h1>Trakky.in</h1>
            </div>
            <div className="sub-heading">
                <h2>Services</h2>
                <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value) } />
                <button onClick={()=>handleSearch(searchQuery)} ><i className="fa-solid fa-magnifying-glass"></i></button>
                
            </div>
            <div className='servies-list'>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Service Name</th>
                            <th>Service Image</th>
                            <th>Service Time</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Gender</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && 
                        <tr>
                            <td>Loading....</td>
                        </tr>

                        }
                        {!isLoading && data.map((value, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{value.service_name}</td>
                                <td><img src={value.service_image}  /></td>
                                <td>{value.service_time.days} Days, {value.service_time.hours} Hours, {value.service_time.minutes} Minutes</td>
                                <td>{value.price} Rs.</td>
                                <td>{value.discount} Rs.</td>
                                <td>{value.city}</td>
                                <td>{value.area}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Services