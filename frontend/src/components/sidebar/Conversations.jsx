import React from 'react'
import Conversation from './COnversation';

export const Conversations = () => {
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
		</div>
    )
}

export default Conversations;