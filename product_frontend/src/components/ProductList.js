import {useEffect, useState} from "react";
import {deleteProduct, getListProducts} from "../services/ProductService";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { getListTypeProduct } from "../services/TypeProductService";

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(0);
    const [typeProducts, setTypeProduct] = useState([]);
    const [productTypeId,setProductTypeId]=useState(0);
    const [totalPage, setTotalPage] = useState();
    const [search, setSearch] = useState("");
    const searchName = () => {

        let resultSearch = document.getElementById("search").value;

        let resultTypeProduct = document.getElementById("typeProduct").value;
        setSearch(resultSearch);
        setProductTypeId(resultTypeProduct);
        setPage(0);
    }
    const loadListTypeproduct = async () => {
        const result = await getListTypeProduct();
        setTypeProduct((prev) => result);
    }
    const nextPages = () => {
        if (page < totalPage -1) {
            setPage((prev) => prev + 1);
        }
    }
    const previosPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    }
    const loadListProduct = async () => {
        const result = await getListProducts(page, search,productTypeId);
        setProduct(result.data.content);
        setTotalPage(result.data.totalPages);
    }
    const deleteShowProduct = (value) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Warning the operation will not be completed !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete ' + value.name,
            cancelButtonText: 'No, keep ' + value.name
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'The operation was successful !',
                    'success'
                );
                await deleteProduct(value.id);
                loadListProduct();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The operation has been cancelled ',
                    'error'
                )
            }
        })

    }
    useEffect(
        () => {
            loadListProduct();
            loadListTypeproduct();
        }, [page, search,productTypeId]
    )

    return (
        <div
            className="mx-auto shadow-lg p-3 mb-5 bg-body rounded"
            style={{width: "80%", marginTop: "2rem"}}
        >
            <div className="d-flex align-items-center justify-content-center">
                <h1>Danh sách sản phẩm</h1>
            </div>
            <div className="d-flex justify-content-end p-3">
                <input  type="search" id="search" role="search"/>
                <select name="typeProduct" id="typeProduct">
                <option value={"0"}>Tất cả</option>
                {
                  typeProducts.map((typeProduct) => (
                    <option value={typeProduct.id}>{typeProduct.name}</option>
                  ))}
                </select>
                <button className="btn btn-outline-success" onClick={()=>searchName()}>Tìm kiếm</button>
                
                <Link className="btn btn-outline-success" to={"/create"}>Thêm mới</Link>

            </div>
            <div
                className="d-flex align-items-center justify-content-center mx-auto"
                style={{width: "90%"}}
            >
                <table
                    className="table table-light table-bordered table-striped-columns table-hover table-responsive-sm text-center">
                    <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng</th>
                        <th>Loại sản phẩm</th>
                        <th>Cập nhật</th>
                        <th>Xóa</th>
                    </tr>
                    {  products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                {(index + 1) + (page) * 3}
                            </td>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.startDay}
                            </td>
                            <td>
                                {product.quantity}
                            </td>
                            <td>
                                {product.productType.name}
                            </td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={()=>navigate(`/edit/${product.id}`)}>
                                    Cập nhật
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-outline-danger" onClick={()=>deleteShowProduct(product)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={()=>previosPage()}>
                                Previous
                            </button>
                        </li>
                        <li className="page-item">
                            <span className="page-link" style={{color: "black"}}>
                                {page+1}/{totalPage}
                        </span>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={() => nextPages()}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );

}
export default ProductList;