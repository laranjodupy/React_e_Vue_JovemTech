import InputField from "./inputField.jsx"

function FormularioCadastro() {
    return (
    <div>

        <InputField label={'Nome: '} type={"text"} name={"name"} />
        <InputField label={'Email: '} type={"email"} name={"name"} />
        <InputField label={'Cpf: '} type={"number"} name={"name"} />


    </div>
    )
}

export default FormularioCadastro;