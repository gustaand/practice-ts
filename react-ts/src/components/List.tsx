import { Sub } from "../types"

interface Props {
  // decir que acepta children:
  // children: JSX.Element[] | string | JSX.Element | React.ReactNode | ...
  subs: Array<Sub>
}

const List = ({ subs }: Props) => {

  return (
    <div>
      <ul>
        {
          subs.map(sub => {
            return (
              <li key={sub.nick}>
                <img src={sub.avatar} alt={sub.nick} />
                <h4>{sub.nick} (<small>{sub.subMonths}</small>)</h4>
                <p>{sub.description?.substring(0, 100)}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default List

// Formas de poner el tipo de react function component, y pasarle la interface de props:
//const List: React.FunctionComponent<Props> = ({ subs }) => {
//const List: React.FC<Props> = ({ subs }) => {
