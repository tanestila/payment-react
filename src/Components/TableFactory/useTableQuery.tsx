import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewTable,
  setTableItems,
  setTablePage,
  setTableSearch,
  setTableSort,
} from "../../redux/modules/table";

export default function useTableQuery(
  entity: string,
  method: Function,
  isMain: boolean,
  itemsDefault?: number
) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(itemsDefault || 100);
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [search, setSearch] = useState({});

  const { name, savedPage, savedItems, savedSearch, sort } = useSelector(
    ({ table }) => {
      return {
        name: table.name,
        savedPage: table.page,
        savedItems: table.items,
        savedSearch: table.search,
        sort: table.sort,
      };
    }
  );

  useEffect(() => {
    if (isMain)
      if (name !== entity) {
        dispatch(setNewTable(entity));
      } else {
        setPage(savedPage);
        setItems(savedItems);
        setSortField(sort.field);
        setSortOrder(sort.order);
        setSearch(savedSearch);
      }
  }, []);

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
      }),
    { refetchOnWindowFocus: false }
  );

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPage(pagination.current);
    setItems(pagination.pageSize);
    setSortField(sorter.field);
    setSortOrder(sorter.order);
    setSearch({ ...search, ...filters });
    if (isMain) {
      dispatch(setTablePage(pagination.current));
      dispatch(setTableItems(pagination.pageSize));
      dispatch(setTableSearch({ ...search, ...filters }));
      dispatch(setTableSort(sorter));
    }
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
