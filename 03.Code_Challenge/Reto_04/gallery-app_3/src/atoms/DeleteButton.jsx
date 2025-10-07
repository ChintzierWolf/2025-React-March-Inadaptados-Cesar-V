import PropTypes from "prop-types";

export default function DeleteButton(onClick, disabled, size, children){
  return(<button type="button" 
  onClick={onClick} disabled={disabled}  
  className={`btn--${size}`}>
    {children || (<pan className="btn-icon"></pan>)}
  </button>);
  /* .btn--sm .btn--md*/
}

DeleteButton.protoTypes = {
  onClick:PropTypes.func.isRequired,
  disabled:PropTypes.bool,
  size:PropTypes.string,
  children:PropTypes.node
}

DeleteButton.defaultProps={
  disabled: false,
  size:'md',
  children:null
}