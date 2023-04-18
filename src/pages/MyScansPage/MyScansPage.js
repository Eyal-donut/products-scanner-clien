import { useEffect, useState } from "react";
import { useCheckCameraAndRefresh } from "../../hooks/useCheckCameraAndRefresh ";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ProductCardMyScans from "../../components/page specific components/myScans page components/ProductCardMyScans/ProductCardMyScans";
import SearchBar from "../../components/global components/SearchBar/SearchBar";
import MyScansHeader from "../../components/page specific components/myScans page components/MyScansHeader/MyScansHeader";

const MyScansPage = () => {
  const { checkCameraAndRefresh } = useCheckCameraAndRefresh();
  const { getItemProperty } = useLocalStorage();

  const [myScans, setMyScans] = useState(() =>
    getItemProperty("loggedUser", "products")
  );
  const [shownScans, setShownScans] = useState(myScans);

  const handleCardBtnClick = () => {
    setMyScans(getItemProperty("loggedUser", "products"));
  };
  const handleSearch = (filteredBySearch) => {
    setShownScans(filteredBySearch);
  };

  const handleNavButtons = (e) => {
    if (e.target.id === "liked-products-btn") {
      setShownScans(myScans.filter((prod) => prod.isLiked === true));
    }
    if (e.target.id === "all-scans-btn") {
      setShownScans(myScans);
    }
  };

  useEffect(() => {
    setShownScans(myScans);
  }, [myScans]);

  useEffect(() => {
    checkCameraAndRefresh();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MyScansHeader handleNavButtons={handleNavButtons} />
      <SearchBar onInputChange={handleSearch} products={myScans} />
      {shownScans
        .sort((a, b) => new Date(b.dateScanned) - new Date(a.dateScanned))
        .map((scan) => {
          return (
            <ProductCardMyScans
              product={scan}
              page="my-scans"
              key={scan.code}
              onBtnClick={handleCardBtnClick}
            />
          );
        })}
    </>
  );
};
export default MyScansPage;
