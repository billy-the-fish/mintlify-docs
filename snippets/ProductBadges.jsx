import React from 'react';

const ProductBadges = ({ products }) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null;
  }

  const badgeConfig = {
    cloud_aws: {
      name: "Cloud: AWS",
      color: "#16A34A"
    },
    cloud_azure: {
      name: "Cloud: Azure", 
      color: "#16A34A"
    },
    self_hosted: {
      name: "Self-hosted products", 
      color: "#07C983"
    },
    mst: {
      name: "MST",
      color: "#15803D"
    }
  };

  const badgeStyle = {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    flexWrap: "wrap"
  };

  const getBadgeStyle = (color) => ({
    backgroundColor: color,
    color: "white",
    padding: "4px 12px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
    border: "none",
    whiteSpace: "nowrap"
  });

  // Process cloud products to create combined badge if both AWS and Azure are present
  const processProducts = (products) => {
    const hasCloudAws = products.includes('cloud_aws');
    const hasCloudAzure = products.includes('cloud_azure');
    const otherProducts = products.filter(p => !p.startsWith('cloud_'));

    const result = [];

    // Handle cloud badges
    if (hasCloudAws && hasCloudAzure) {
      result.push({
        key: 'cloud_combined',
        name: 'Tiger Cloud: AWS, Azure',
        color: '#16A34A'
      });
    } else if (hasCloudAws) {
      result.push({
        key: 'cloud_aws',
        name: 'Cloud: AWS',
        color: '#16A34A'
      });
    } else if (hasCloudAzure) {
      result.push({
        key: 'cloud_azure',
        name: 'Cloud: Azure',
        color: '#16A34A'
      });
    }

    // Add other products
    otherProducts.forEach(product => {
      const config = badgeConfig[product];
      if (config) {
        result.push({
          key: product,
          name: config.name,
          color: config.color
        });
      }
    });

    return result;
  };

  const processedProducts = processProducts(products);

  return (
    <div style={badgeStyle}>
      {processedProducts.map((product) => (
        <span
          key={product.key}
          style={getBadgeStyle(product.color)}
        >
          {product.name}
        </span>
      ))}
    </div>
  );
};

export default ProductBadges;