import styles from './PricingTable.module.scss';

interface PricingTableProps {
  billingCycle?: 'M' | 'Y';
}

const PricingTable = ({ billingCycle = 'M' }: PricingTableProps) => {
  const tableData = {
    M: {
      free: { price: '무료', projects: 3, meetings: 3 },
      standard: { price: '350,000원', projects: 20, meetings: 20 },
      premium: { price: '2,400,000원', projects: '무제한', meetings: '무제한' },
    },
    Y: {
      free: { price: '무료', projects: 3, meetings: 3 },
      standard: { price: '310,000원', projects: 20, meetings: 20 },
      premium: { price: '2,100,000원', projects: '무제한', meetings: '무제한' },
    },
  };

  const currentData = tableData[billingCycle];
  const priceLabel = billingCycle === 'M' ? '월간 요금' : '연간 요금';

  const mobileCards = [
    {
      title: '일반',
      price: currentData.free.price,
      features: [
        { label: priceLabel, value: currentData.free.price },
        { label: '견적 회신 비용', value: '8,000 원' },
        { label: '견적 회신 무료 쿠폰' },
        { label: '계약 성사 중개수수료', value: '공사대금의 3%' },
        { label: '견적리스트 상단 노출 광고', value: 'x' },
        { label: '확정공사 제공', value: 'x' },
        { label: '업체영상 홍보', value: 'x' },
        { label: '사진촬영 대행', value: 'x' },
      ],
    },
    {
      title: '스탠다드',
      price: currentData.standard.price,
      features: [
        { label: priceLabel, value: currentData.standard.price },
        {
          label: '견적 회신 비용',
          value: '3,000 원',
          sub: '(1개 견적 당 1회성 비용)',
        },
        {
          label: '견적 회신 무료 이용권 쿠폰',
          value: '월 3회권 제공',
          sub: '(월 갱신, 이월 누적 불가)',
        },
        { label: '계약 성사 중개수수료', value: '공사대금의 1%' },
        { label: '견적리스트 상단 노출 광고', value: 'x' },
        { label: '확장공사 홍보', value: 'x' },
        { label: '업체영상 홍보', value: 'x' },
        { label: '사진촬영 대행', value: 'x' },
      ],
    },
    {
      title: '프리미엄',
      price: currentData.premium.price,
      features: [
        { label: priceLabel, value: currentData.premium.price },
        {
          label: '견적 회신 비용',
          value: '0 원',
          sub: '(1개 견적 당 1회성 비용)',
        },
        {
          label: '견적 회신 무료 이용권 쿠폰',
          value: '무료',
          sub: '(월 갱신, 이월 누적 불가)',
        },
        { label: '계약 성사 중개수수료', value: '무료' },
        { label: '견적리스트 상단 노출 광고', value: 'o' },
        {
          label: '확장공사 홍보',
          value: '공사대금의 3%',
          sub: '(공동구매 또는 체인점 공사)',
        },
        { label: '업체영상 홍보', value: 'o' },
        { label: '사진촬영 대행', value: 'o(예정)' },
      ],
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.pricingTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}>기능</th>
            <th className={styles.headerCell}>일반</th>
            <th className={styles.headerCell}>스탠다드</th>
            <th className={styles.headerCell}>프리미엄</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.labelCell}>{priceLabel}</td>
            <td className={styles.dataCell}>{currentData.free.price}</td>
            <td className={styles.dataCell}>{currentData.standard.price}</td>
            <td className={styles.dataCell}>{currentData.premium.price}</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>견적 회신 비용</td>
            <td className={styles.dataCell}>4,000 원</td>
            <td className={styles.dataCell}>3,000 원</td>
            <td className={styles.dataCell}>0 원</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>계약 성사 중개수수료</td>
            <td className={styles.dataCell}>공사대금의 3%</td>
            <td className={styles.dataCell}>공사대금의 1%</td>
            <td className={styles.dataCell}>무료</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>견적리스트 상단 노출 광고</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>o</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>확정공사 제공</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>공사대금의 3%</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>업체영상 홍보</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>o</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>사진촬영 대행</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>x</td>
            <td className={styles.dataCell}>o(예정)</td>
          </tr>
          <tr>
            <td className={styles.labelCell}>
              책임보장 마크
              <br />
              (공사 책임 보증금)
            </td>
            <td className={styles.onlyDataCell} colSpan={3}>
              선택 가능
              <br />
              계약 시, 공시대금의 10% 보증금 지불 조건
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.mobileCardWrapper}>
        {mobileCards.map((card) => (
          <div key={card.title} className={styles.planCard}>
            <div className={styles.planHeader}>
              <div className={styles.planTitle}>{card.title}</div>
              <div className={styles.planPrice}>{card.price}</div>
            </div>
            <div className={styles.planFeatures}>
              {card.features.map((feature, idx) => (
                <div key={idx} className={styles.featureRow}>
                  <div className={styles.featureLabel}>{feature.label}</div>
                  <div className={styles.featureValue}>{feature.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.commonFeature}>
          <div className={styles.featureTitle}>
            책임보장 마크 (공사 책임 보증금)
          </div>
          <div className={styles.featureDesc}>
            선택 가능
            <br />
            계약 시, 공시대금의 10% 보증금 지불 조건
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
