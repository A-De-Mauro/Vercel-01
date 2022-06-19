interface Props {
  isValidating?: boolean
}

export const FetchingMessage = ({ isValidating = false }: Props) => {
  return (
    <div className="flex items-center gap-2 italic text-xs bottom-0 right-0 ml-3 mb-3 text-slate-400">
      <span className="relative flex h-2 w-2">
        <span
          className={`${
            isValidating ? 'animate-pulse' : 'animate-ping'
          } relative inline-flex rounded-full h-2 w-2 bg-green-700`}
        ></span>
      </span>
      The chat is open and regularly fetching for updates
    </div>
  )
}

export default FetchingMessage
