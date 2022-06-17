export const CustomerSupportMessage = ({ text }: { text: string; }) => {
    return <div className="col-span-11 col-end-10 border-dashed border-4 border-slate-300 bg-slate-200 p-3">
        {text}
    </div>;
};
