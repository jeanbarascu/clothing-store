import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryMap } from '../../store/categories/categories.selector';
import CategoryPreview from '../../components/category-preview/category-preview.components';
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoryMap);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
