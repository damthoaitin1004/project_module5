import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProduct, getById } from "../services/ProductService";
import { getListTypeProduct } from "../services/TypeProductService";
import Swal from "sweetalert2";

const ProductEdit = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState();
    const [typeProducts, setTypeProduct] = useState([]);
    const loadDetailProduct = async (id) => {
        const result = await getById(id);
        const newData = { ...result, productType: `${JSON.stringify(result.productType)}`};
        setProduct(newData);
    }
    const loadListTypeproduct = async () => {
        const result = await getListTypeProduct();
        setTypeProduct((prev) => result);
    }
    const update = async (value) => {
        // const newValue = { ...value, tye: JSON.parse(value.type) };
      const result =  await editProduct(value);
      Swal.fire(
        'Updated!',
        'The operation was successful !',
        'success'
    );
        navigate("/");


    }
    useEffect(
        () => {
            loadListTypeproduct();
            if (params.id) {
                loadDetailProduct(params.id);
            }
        }, [params]
    )
    if (!product) {
        return null;
    }
    return (
        <>
           <Formik
      initialValues={
        {
          ...product
        }
      }
      validationSchema={
        Yup.object({
          name: Yup.string().required("Vui lòng không bỏ trống"),
          startDay: Yup.string().required("Vui lòng không bỏ trống"),
          quantity: Yup.number().required("Vui lòng không bỏ trống").min(1,"Số lượng phải lớn hơn 0")

        })
      }
      onSubmit={
    
        async (value) => {
            console.log(value);
          const newValue = {
            ...value, productType: JSON.parse(value.productType)
          };
          await update(newValue);
        }
      }>
      <div className="row mx-auto" style={{width:"80%"}}>
        <div className="col-md-3" />
        <div className="col-md-6 shadow-lg rounded">
          <Form >
            <div className="d-flex justify-content-center">
              <h1>Cập nhật sản phẩm</h1>
            </div>
            <div className="input-group ">
              <span
                className="input-group-text mx-auto"
                id="basic-addon1"
                style={{ width: 200 }}
              >
                Name<small style={{ color: "red", marginLeft: "0.5rem" }}> *</small>
              </span>
              <Field
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
              />
            </div>
            <div style={{ height: 20, color: "red" }}>
              <ErrorMessage name="name" style={{ marginLeft: "27%", paddingBottom: 10 }} />
            </div>
            <div className="input-group ">
              <span
                className="input-group-text mx-auto"
                id="basic-addon2"
                style={{ width: 200 }}
              >
                Ngày nhập hàng
                <small style={{ color: "red", marginLeft: "0.5rem" }}> *</small>
              </span>
              <Field
                type="date"
                className="form-control"
                placeholder="Username"
                name="startDay"
              />
            </div>
            <div style={{ height: 20, color: "red" }}>
              <ErrorMessage name="startDay" style={{ color: "red", marginLeft: "27%", paddingBottom: 10 }} />
            </div>
        
            <div className="input-group  mx-auto">
              <span className="input-group-text" style={{ width: 200 }}>
                Số lượng
                <small style={{ color: "red", marginLeft: "0.5rem" }}> *</small>
              </span>
              <Field
                type="number"
                className="form-control"
                name="quantity"
              />
            </div>
            <div style={{ height: 20, color: "red" }}>
              <ErrorMessage name="quantity" style={{ color: "red", marginLeft: "27%", paddingBottom: 10 }} />
            </div>
           
            
              
            <div className="input-group mb-3 ">
              <label
                className="input-group-text mx-auto"
                htmlFor="type"
                style={{ width: 200 }}
              >
                 Loại sản phẩm
                <small style={{ color: "red", marginLeft: "0.5rem" }}> *</small>
              </label>
              <Field as="select" className="form-select" id="productType" name="productType">
                {
                  typeProducts.map((typeProduct) => (
                    <option value={`${JSON.stringify(typeProduct)}`}>{typeProduct.name}</option>
                  ))}

              </Field>
            </div>
           
            <div style={{ height: 20, color: "red" }}>
              <ErrorMessage name="address" style={{ color: "red", marginLeft: "27%", paddingBottom: 10 }} />
            </div>
            <div
              className="input-group mb-3 row mx-auto"
              style={{ width: "100%", marginTop: "3%" }}
            >
              <div className="col-6" align="end">
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  style={{ width: "50%" }}
                >
                  Save
                </button>
              </div>
              <div className="col-6" align="start">
                <a>
                  <Link
                    className=" btn btn-outline-warning"
                    style={{ width: "50%" }}
                    to={"/"}
                  >
                    Cancle
                  </Link>
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
        </>
    );
}
export default ProductEdit;