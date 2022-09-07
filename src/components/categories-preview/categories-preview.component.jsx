import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategoryMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selector';
import CategoryPreview from '../../components/category-preview/category-preview.components';
import Spinner from '../spinner/spinner.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoryMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
