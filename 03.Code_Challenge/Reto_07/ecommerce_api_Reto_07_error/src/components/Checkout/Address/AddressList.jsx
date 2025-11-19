import AddressItem from './AddressItem';

const AddressList = ({ addresses }) => {
     return (
       <div className="address-list">
         {addresses.map(address => (
           <AddressItem key={address.id} address={address} />
         ))}
       </div>
     );
   };

export default AddressList;