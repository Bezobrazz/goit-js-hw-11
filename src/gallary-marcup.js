export const createMarkup = photos => {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
				<a href="${largeImageURL}">
				<img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
				</a>
				
				<div class="info">
					<div class="info-wrapper">
						<p class="info-item">
							<b>Likes</b>
						</p>
						<p class="info-stat">${likes}</p>
					</div>
					<div class="info-wrapper">
						<p class="info-item">
							<b>Views</b>
						</p>
						<p class="info-stat">${views}</p>
					</div>
					<div class="info-wrapper">
						<p class="info-item">
							<b>Comments</b>
						</p>
						<p class="info-stat">${comments}</p>
					</div>
					<div class="info-wrapper">
						<p class="info-item">
							<b>Downloads</b>
						</p>
						<p class="info-stat">${downloads}</p>
					</div>
				</div>
			</div>`
    )
    .join('');
};
