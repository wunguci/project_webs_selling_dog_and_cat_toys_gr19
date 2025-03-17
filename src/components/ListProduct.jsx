  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchProducts } from "../stores/productSlice";
  import Product from "./Product";
  import { Link } from "react-router-dom";
  import axios from "axios";

  function ListProduct({ style, title }) {
    const dispatch = useDispatch();
    const { items: products, status } = useSelector((state) => state.products);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/categories");
          setCategories(res.data);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        }
      };

      fetchCategories();
    }, []);

    const collections = categories.map((category) => ({
      label: category.name,
      href: `/categories/${category.slug}`,
    }));


    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "failed") {
      return <div>Error loading products.</div>;
    }

    return (
      <div
        className={`flex flex-col gap-4 ${
          style ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="hidden lg:w-1/3 lg:flex flex-col items-center border-2 gap-5 border-[#c49a6c]">
          <div className="relative group hover:cursor-pointer">
            <img
              className="p-10 pb-0 hover:opacity-70"
              src="https://product.hstatic.net/200000521195/product/cc7ab594-27c0-41b4-b35f-dac71034e395_84ce728c1e344bd785ca78e2f686e237_large.jpeg"
              alt=""
            />
          </div>
          <h5 className="hover:text-[#c49a6c] hover:cursor-pointer">
            Bát ăn nghiêng chống gù cho chó mèo
          </h5>
          <span className="text-2xl text-[#c49a6c] font-bold">45,000Đ</span>
        </div>
        <div className="w-full lg:w-2/3">
          <div>
            <div className="border-b-2 border-[#c49a6c] mb-5 md:0">
              <div className="bg-[#c49a6c] w-44 text-center p-1 skew-x-[-15deg] ml-1">
                <h2 className="text-2xl text-white">{title}</h2>
              </div>
            </div>
            <ul className="hidden md:flex gap-3 pb-5">
              {collections.map((collection, index) => (
                <li key={index}>
                  <Link
                    to={
                      title === "Shop cho cún"
                        ? `/collections/${collection.link || collection.link1}`
                        : `/collections/${collection.link || collection.link2}`
                    }
                    className="hover:text-[#c49a6c]"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default ListProduct;
