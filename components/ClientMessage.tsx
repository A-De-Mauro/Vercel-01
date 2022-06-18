export const ClientMessage = ({ text }: { text: string }) => {
  return (
    <div className="col-span-11 col-start-2 border-dashed border-4 border-slate-500 bg-slate-300 p-3 mb-2">
      {text}
    </div>
  )
}
