interface Props {
  children: React.ReactNode
}

export const ChatContainer = ({ children }: Props) => (
  <div className="w-screen h-screen grid grid-cols-11 gap-0">{children}</div>
)

export default ChatContainer
