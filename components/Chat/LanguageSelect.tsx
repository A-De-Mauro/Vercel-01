import { supportedLanguages } from '../../lib/utils/languages'

interface Props {
  setCurrentLanguage(language: string): void
  currentLanguage: string
  isSupport: boolean
}

export const LanguageSelect = ({
  currentLanguage,
  setCurrentLanguage,
  isSupport,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-between mx-2 my-2">
      <div className="flex items-center">
        Your language is set as:
        <form className="max-w-md">
          <select
            defaultValue={currentLanguage}
            className="block appearance-none w-full bg-slate-200 border border-slate-200 text-slate-700 mx-3 py-1 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
            id="grid-state"
            onChange={(e) => setCurrentLanguage(e.target.value)}
          >
            {supportedLanguages.map((supportedLanguage) => (
              <option
                key={supportedLanguage.code}
                value={supportedLanguage.code}
              >
                {supportedLanguage.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      {isSupport && (
        <button className="px-3 bg-slate-900 text-white hover:bg-slate-500 cursor-pointer transition-colors duration-300">
          Close chat
        </button>
      )}
    </div>
  )
}

export default LanguageSelect
