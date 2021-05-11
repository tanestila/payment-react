import { useState } from "react";
import { useQuery } from "react-query";

export default function useTableQuery(entity, method) {
  const [page, setpage] = useState(1);
  const [items, setItems] = useState(100);
  const [sortField, setsortField] = useState();
  const [sortOrder, setsortOrder] = useState();
  const [search, setSearch] = useState({});

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    // isPreviousData,
  } = useQuery(
    // <IResponse<MerchantType>, Error>
    [entity, page, items, sortField, sortOrder, search],
    () =>
      method({
        page,
        items,
        sort_col: sortOrder && sortField,
        sort_dir: sortOrder
          ? sortOrder === "ascend"
            ? false
            : true
          : undefined,
        ...search,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(pagination);
    setpage(pagination.current);
    setItems(pagination.pageSize);
    setsortField(sorter.field);
    setsortOrder(sorter.order);
    setSearch({ ...search, ...filters });
  };

  const onSearch = (params: any) => {
    setSearch({ ...params });
  };

  return {
    isLoading,
    isError,
    error,
    data,
    items,
    search,
    isFetching,
    handleTableChange,
    onSearch,
  };
}
