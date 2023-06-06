const BASE_URL =
  'https://proxy.takemobi.io/mobility-planner/demo/v2/dialog/response?mode=MOBI_AGENT&session_id=';

const STATUS_MAP = {
  selected_filters: { src: 'User', status: 'include' },
  recommended_filters: { src: 'System', status: 'include' },
  not_recommended_filters: { src: 'System', status: 'exclude' },
  excluded_filters: { src: 'User', status: 'include' },
};

/**
 * @summary filter out tags that are either <not supported> or <not preferences but locations>
 * <not supported>
 * TODO: a temporary solution for V1 since we are not supporting flights and stays in this version, thus, filter out all tags if the categories are 'ACCOMMODATION'
 * <not preferences but locations>
 * TODO: "GEOLOCATION". But in the future this seems to be related to "Specific POIs". Needs a way to support this in the future.
 *
 * @param tags [{id, category, name, parent}]
 * @param excludeKeys Set<str>, set to ['ACCOMMODATION', 'GEOLOCATION'] for this version
 *
 * @returns [{id, category, name, parent}]
 */
function excludeTags(tags, excludeKeys = ['ACCOMMODATION', 'GEOLOCATION']) {
  const keySet = new Set(excludeKeys);
  return tags.filter((tag) => !keySet.has(tag.category));
}

function parseRawRes(resArr) {
  const excludeSet = new Set(['dialog_response', 'intent_response']);
  const filteredArr = resArr.filter((data) => !excludeSet.has(data.name));
  return filteredArr;
}

function formatRawRes(rawRes) {
  let formattedRes = [];
  let start = 0,
    count = 0;

  for (let i = 0; i < rawRes.length; i++) {
    if (rawRes[i] === '{') {
      count++;
    } else if (rawRes[i] === '}') {
      count--;
      if (count === 0) {
        try {
          let json = rawRes.slice(start, i + 1);
          formattedRes.push(JSON.parse(json));
          start = i + 1;
        } catch (error) {
          console.error('Failed to parse the raw response: ', error);
        }
      }
    }
  }

  if (start < rawRes.length) {
    formattedRes.push({ message: rawRes.slice(start) });
  }

  return generateJSXFromData(formattedRes);
}

function generateJSXFromData(data) {
  return data.map((item, index) => {
    if (item.message) {
      return <p key={index}>{item.message}</p>;
    } else {
      return (
        <div key={index}>
          {Object.keys(item).map((key) => {
            const value = item[key];
            let displayValue;
            if (Array.isArray(value)) {
              displayValue = value.length ? value.join(', ') : 'None';
            } else if (typeof value === 'object' && value !== null) {
              displayValue = JSON.stringify(value);
            } else {
              displayValue = value;
            }
            return (
              <p key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {displayValue}
              </p>
            );
          })}
        </div>
      );
    }
  });
}

export { BASE_URL, STATUS_MAP, excludeTags, parseRawRes, formatRawRes };
