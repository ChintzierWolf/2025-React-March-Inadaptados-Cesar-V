const AddressItem = ({ address, onSelect }) => {
  return (
    <div className="address-item" onClick={() => onSelect(address)}>
      <h4>{address.name}</h4>
      <p>{address.address1}</p>
      <p>{address.city}, {address.postalCode}</p>
      {address.default && <span className="default-badge">Predeterminada</span>}
    </div>
  );
};

export default AddressItem;