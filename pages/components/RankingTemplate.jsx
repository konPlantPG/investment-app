import React from 'react'

const RankingTemplate = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.posts.map((post, postIndex) => (
                    <tr key={postIndex}> 
                        <td>{post.name}</td>
                        <td>{post.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankingTemplate