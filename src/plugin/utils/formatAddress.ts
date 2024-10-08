export const formatAddress = (data: any) => {
    let formattedAddress = '';
    Object.keys(data).forEach(key => {
        const value = data[key] || ''; // 값이 없으면 ''로 설정
        formattedAddress += `${key}: ${value}\n`; // 각 줄마다 key: value 형식으로 추가
    });
    return formattedAddress;
};
