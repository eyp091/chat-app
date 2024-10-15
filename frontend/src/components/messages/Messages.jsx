import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkleleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
    const {messages, loading} = useGetMessages();
    const lastMessageRed = useRef();

    useListenMessages();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRed.current?.scrollIntoView({behavior: "smooth"});
        }, 100);
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRed}>
                    <Message message={message} />
                </div>
            ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )} 
        </div>
    )
}

export default Messages