import React from 'react'
import Polltemp from './pollTemp.jsx'

const Pollcrd = ({polls})=>{

    return (
        <div className="content">
            {
                polls.length > 0 ?
                    polls.map((poll, i) => {
                        return (

                            <Polltemp
                                key={i}
                                address={polls[i]._id}
                                from={polls[i].from}
                                txt={polls[i].txt}

                            />

                        )
                    })
                    :
                    <p>you got no polls yet</p>
            }
        </div>
    )
}
export default Pollcrd