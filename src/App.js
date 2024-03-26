import "./App.css";
import { useEffect, useState } from "react";
import instance from "../src/api/index";
import Product from "./components/Product";
import { Tab, Tabs, Typography } from "@mui/material";
import ProductModal from "./components/ProductModal";
import Search from "./components/Search";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [categorySelect, setCategorySelect] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchInp, setSearchInp] = useState("");
  const [searchFrom, setSearchFrom] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [value]);

  const getProducts = () => {
    instance
      .get("/products")
      .then((res) => {
        if (res?.status === 200) {
          const productData = res?.data;
          if (categorySelect !== "") {
            const filteredData = productData.filter(
              (item) => item?.category === categorySelect
            );
            setProducts(filteredData);
          } else {
            setProducts(res?.data);
          }
          setSearchFrom(res?.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    instance
      .get("/products/categories")
      .then((res) => {
        if (res?.status === 200) {
          setCategories(res?.data);
          setCategorySelect(res?.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProductSelect = (item) => {
    setIsModal(true);
    instance
      .get(`/products/${item?.id}`)
      .then((res) => {
        if (res?.status == 200) {
          setSelectedProduct(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setIsModal(false);
    setSelectedProduct({});
  };

  const handleSearch = () => {
    if (searchInp !== "") {
      const searched = searchFrom.filter((item) =>
        item.title?.includes(searchInp)
      );
      setProducts(searched);
    } else {
      getProducts();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
     }
  };

  return (
    <div className="page-wrapper">
      <ProductModal
        open={isModal}
        handleClose={handleClose}
        data={selectedProduct}
      />
     
      <Search searchInp={searchInp} handleKeyDown={handleKeyDown} setSearchInp={setSearchInp} handleSearch={handleSearch} />

      <div className="flex-box">
        <Typography
          sx={{ fontSize: "22px", fontWeight: 600 }}
        >{`Products (${products?.length})`}</Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ marginBottom: "18px" }}
        >
          <Tab
            label={"All"}
            onClick={() => {
              setCategorySelect("");
            }}
          />
          {categories?.length > 0 &&
            categories?.map((item, index) => {
              return (
                <Tab
                  label={item}
                  onClick={() => {
                    setCategorySelect(item);
                  }}
                  key={index}
                />
              );
            })}
        </Tabs>
      </div>

      <div className="product-wrapper">
        {products?.length > 0 &&
          products?.map((item, index) => {
            return (
              <Product
                data={item}
                handleProductSelect={handleProductSelect}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
