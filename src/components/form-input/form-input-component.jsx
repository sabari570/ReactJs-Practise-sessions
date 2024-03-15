import './form-input-styles.scss';

const FormInput = ({ label, type, handleChange, name, value }) => {
    return (
        <div className="group">
            <input
                className="form-input"
                type={type}
                required
                onChange={handleChange}
                name={name}
                value={value}
            ></input>
            {/* Code which says only if label exists only then render this property */}
            {
                label &&
                (<label className={`${value.length ? 'shrink' : ''} form-input-label`}>{label}</label>)
            }
        </div>
    );
};

export default FormInput;