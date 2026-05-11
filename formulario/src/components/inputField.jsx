/** @param {Object} param0 
* @param {HTMLInputTypeAttribute} param0.type */
function InputField({label, type, name}) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} name={name} />
        </div>
    )
}

export default InputField;