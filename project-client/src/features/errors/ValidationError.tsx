
interface Props {
    errors: string[]
}
export default function ValidationError({ errors }: Props) {
    return (<>
        {errors && errors.map((err: string, i) => (
            <div key={i}>{err}</div>
        ))}
    </>);
}