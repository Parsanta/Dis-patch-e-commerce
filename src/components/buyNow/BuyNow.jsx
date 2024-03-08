import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const BuyNow = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-white bg-indigo-800 hover:bg-green-800 rounded-xl"
      >
        Buy now
      </Button>

      <Dialog open={open} handler={handleOpen} >
        <DialogBody>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
              placeholder="Your Name"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
              placeholder="Your Address"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
              placeholder="Your Pincode"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
              placeholder="Your Mobile Number"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>

          <div className="mt-4">
            <Button
              type="button"
              onClick={() => {
                handleOpen();
                buyNowFunction();
              }}
              className="w-full px-4 py-3 text-white bg-indigo-800 hover:bg-green-800 rounded-lg"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNow;
