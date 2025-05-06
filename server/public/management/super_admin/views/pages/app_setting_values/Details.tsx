import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';

export interface Props {}

const Details: React.FC<Props> = () => {
  const state: typeof initialState = useSelector(
    (state: RootState) => state[setup.module_name],
  );
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(storeSlice.actions.set_item({}));
    dispatch(details({ id: params.id }) as any);
  }, [dispatch, params.id]);

  const get_value = (key: string) => {
    try {
      const value = state.item[key] || state.item?.info?.[key];
      if (key === 'value' && state.item.type === 'file' && typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            return parsed.filter((path: unknown) => typeof path === 'string');
          }
        } catch {
          return [value]; // Fallback to raw value as a single-item array
        }
      }
      return value || '';
    } catch {
      return '';
    }
  };

  const render_value = (key: string) => {
    const value = get_value(key);
    if (key === 'value' && state.item.type === 'file' && Array.isArray(value)) {
      if (value.length === 0) {
        return 'No images';
      }
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {value.map((path: string, index: number) => (
            <img
              key={index}
              src={`/${path}`} // Adjust base URL if needed
              alt={`Image ${index + 1}`}
              style={{
                maxHeight: '100px',
                objectFit: 'cover',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'; // Hide broken images
                console.log(`Failed to load image: ${path}`);
              }}
            />
          ))}
        </div>
      );
    }
    return value.toString();
  };

  return (
    <div className="page_content">
      <div className="explore_window fixed_size">
        <Header page_title={setup.details_page_title} />

        {Object.keys(state.item).length > 0 && (
          <div className="content_body custom_scroll">
            <table className="table quick_modal_table table-hover">
              <tbody>
                {['title', 'value'].map((key) => (
                  <tr key={key}>
                    <td>{key.replaceAll('_', ' ')}</td>
                    <td>:</td>
                    <td>{render_value(key)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Footer>
          {state.item?.id && (
            <li>
              <Link
                to={`/${setup.route_prefix}/edit/${state.item.id}`}
                className="btn-outline-info outline"
              >
                <span className="material-symbols-outlined fill">edit_square</span>
                <div className="text">Edit</div>
              </Link>
            </li>
          )}
        </Footer>
      </div>
    </div>
  );
};

export default Details;
