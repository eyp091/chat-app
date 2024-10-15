import { create } from 'zustand'

// zustand: React projelerinde basit ve hızlı bir şekilde global state yönetimi yapabilmeyi sağlayan hafif bir state management kütüphanesidir.
// useConversation: bu hook, konuşmalar ve mesaj yönetimi ile ilgili bir state yönetimi sağlar.
// bu hook kullanıldığında bileşeninizde bir konuşma (seçilen sohbet) ve mesajları izleyebilir ve değiştirebilirsiniz.
const useConversation = create((set) => ({
    selectedConversation: null, // seçilen konuşmayı tutar.
    setSelectedConversation: (selectedConversation) => set({selectedConversation}), // seçilen konuşmayı güncellemeyi sağlar.
    messages: [], // seçilen mesajı tuttar.
    setMessage: (messages) => set({messages}), // mesajları güncellemeye yarar.
}));

export default useConversation;