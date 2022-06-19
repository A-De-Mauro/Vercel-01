export const CurrentUserMessage = ({ text }: { text: string }) => {
  return (
    <div className="text-end col-span-11 col-start-2 border-dashed border-y-4 border-l-4 border-slate-400 bg-slate-200 p-3 mb-2">
      {text}
    </div>
  )
}

export const OtherUserMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-span-11 col-end-10 border-dashed border-y-4 border-r-4 border-slate-200 bg-slate-100 p-3">
      {text}
    </div>
  )
}
