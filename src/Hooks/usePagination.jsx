import { useState } from "react";


const usePagination = (totalItams, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(totalItams / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItams - 1)

    const nextPage = () => {
        if (currentPage < totalItams) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(pageNumber)
        }
    }

    const setPage = (pageNumber) => {
        if (currentPage >= 1 && pageNumber <= totalItams) {
            setCurrentPage(pageNumber)
        }
    }

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        nextPage,
        prevPage,
        setPage

    }
};

export default usePagination;