import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

export default function useTableQuery(
  entity: string,
  method: Function,
  itemsDefault?: number
) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState(itemsDefault || 100);
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [search, setSearch] = useState({});

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    status,
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
      })
  );

  // useEffect(() => {
  //   dispatch(setNewTable("merchants"));
  // }, []);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPage(pagination.current);
    setItems(pagination.pageSize);
    setSortField(sorter.field);
    setSortOrder(sorter.order);
    setSearch({ ...search, ...filters });
  };

  const onSearch = (params: any) => {
    setSearch({ ...params });
  };

  return {
    isLoading,
    status,
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
