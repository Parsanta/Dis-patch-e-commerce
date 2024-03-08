import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductDetails from "../../components/admin/ProductDetails";
import UserDetails from "../../components/admin/UserDetails";
import OrderDetails from "../../components/admin/OrderDetails";
import { useContext } from "react";
import myContext from "../../context/MyContext";
import Layout from "../../components/Layout/Layout";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct,getAllOrder,getAllUser } = context;

  return (
    <Layout>
      <div className="bg-white shadow-lg p-6 rounded-md mt-10 mx-5">
        {/* Top */}
        <div className="top mb-5 px-5 mt-5">
          <h1 className="text-center text-4xl font-bold text-indigo-600">
            Admin Dashboard
          </h1>
        </div>

        <div className="px-5">
          <div className="mb-5">
            {/* main  */}
            <div className="py-3 row justify-content-center align-items-center">
              {/* image  */}
              <div className="col-lg-4 col-md-6 col-sm-12 mb-2 text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt=""
                  className="mx-auto d-block w-60"
                />
              </div>
              {/* text  */}
              <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                <h1 className="text-lg mb-3 text-indigo-600">
                  <span className="font-bold">Name:</span> {user?.name}
                </h1>
                <h1 className="text-lg text-indigo-600">
                  <span className="font-bold">Email:</span> {user?.email}
                </h1>
                <h1 className="text-lg text-indigo-600">
                  <span className="font-bold">Role:</span> {user?.role}
                </h1>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="">
            <Tabs>
              <TabList className="flex flex-wrap -m-4 text-center justify-center">
                {/* Total Products */}
                <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                  <div className="border bg-indigo-50 hover:bg-indigo-100 border-indigo-100 px-4 py-3 rounded-md shadow-md">
                    <div className="text-indigo-600 w-12 h-12 mb-3 inline-block">
                      <i className="fas fa-shopping-basket text-3xl"></i>
                    </div>
                    <h2 className="title-font font-medium text-3xl">
                      {getAllProduct.length}
                    </h2>
                    <p className="text-indigo-600 font-bold">Total Products</p>
                  </div>
                </Tab>

                {/* Total Order  */}
                <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                  <div className="border bg-indigo-50 hover:bg-indigo-100 border-indigo-100 px-4 py-3 rounded-md shadow-md">
                    <div className="text-indigo-600 w-12 h-12 mb-3 inline-block">
                      <i className="fas fa-list-ol text-3xl"></i>
                    </div>
                    <h2 className="title-font font-medium text-3xl">{getAllOrder.length}</h2>
                    <p className="text-indigo-600 font-bold">Total Order</p>
                  </div>
                </Tab>

                {/* Total User  */}
                <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                  <div className="border bg-indigo-50 hover:bg-indigo-100 border-indigo-100 px-4 py-3 rounded-md shadow-md">
                    <div className="text-indigo-600 w-12 h-12 mb-3 inline-block">
                      <i className="fas fa-users text-3xl"></i>
                    </div>
                    <h2 className="title-font font-medium text-3xl">{getAllUser.length}</h2>
                    <p className="text-indigo-600 font-bold">Total Users</p>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <ProductDetails />
              </TabPanel>

              <TabPanel>
                <OrderDetails/>
              </TabPanel>

              <TabPanel>
                <UserDetails />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
