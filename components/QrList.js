import styles from '../styles/Qrs.module.css';
import { useQuery, gql } from '@apollo/client';
export const GET_QRS = gql`query GetQrs {
    qrs{
      svg
    }
}`;

const QrList = () => {
    const { loading, error, data } = useQuery(GET_QRS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className={styles.grid}>
            {
                data.qrs.map(({ svg }, i) => (
                <div key={`index-based-key-${i}`} className={styles.listedQr}>
                    <div dangerouslySetInnerHTML={{__html: svg}}></div>
                </div>
                ))
            }
        </div>
    );
}

export default QrList;