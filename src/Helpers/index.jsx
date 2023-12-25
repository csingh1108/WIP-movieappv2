export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}min`;
}

export function formatDate(inputDate) {
    return new Date(inputDate).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}

export function formatDateTruncated(inputDate) {
    return new Date(inputDate).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatRole(role) {
    if (!role) {
        return '';
    }
    const words = role.split('_');
    return words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase()

}



