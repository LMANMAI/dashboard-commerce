import React, { useState, useEffect } from "react";
import { getProducts } from "@services";
const MisProductos: React.FC = () => {
  const [activeprod, setActiveProd] = useState<any>({});
  const [products, setProducts] = useState<any>([]);

  const getData = async () => {
    const req = await getProducts();
    setProducts(req.sneakers);
    console.log(req);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h3
        style={{ color: "white", padding: "10px" }}
        className="bg-neutral m-8"
      >
        My products
      </h3>
      <div className="overflow-x-auto m-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>Relase Year</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: any) => (
              <tr key={item.name}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.posterPathImage} alt={item.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>$ {item.price}</td>
                <td>{item.genre}</td>
                <td>{item.quantity}</td>
                <td>{item.relaseYear}</td>

                <th>
                  <button
                    className="btn btn-neutral btn-xs"
                    onClick={() => {
                      setActiveProd(item);
                      if (document) {
                        (
                          document.getElementById(
                            "my_modal_1"
                          ) as HTMLFormElement
                        ).showModal();
                      }
                    }} // eslint-disable-line
                  >
                    details
                  </button>
                </th>
              </tr>
            ))}

            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">{activeprod.name}</p>
                <img src={activeprod.posterPathImage} alt={activeprod.name} />
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </div>
              </form>
            </dialog>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MisProductos;
