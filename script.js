let filteredData;
d3.csv('cities.csv', d3.autoType).then(data => {
    filteredData = data.filter(x => {
        return x.eu;
    })
    d3.select(".city-count")
        .text(() => `Number of cities: ${filteredData.length}`);

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll('.population-plot')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', (d) => {
            if (d.population < 1000000) { return 4 };
            return 8;
        })

    svg.selectAll('text')
        .data(filteredData)
        .enter()
        .append('text')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y - 10)
        .text((d) => {
            if (d.population > 1000000) {
                return d.country
            }
            return ''
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
})

let filteredData2;
d3.csv('buildings.csv', d3.autoType).then(data => {
    filteredData2 = data.sort((x, y) => x.height_ft - y.height_ft).reverse()

    const width = 500;
    const height = 500;
    const svg = d3.select('.building-bar')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.selectAll('.building-bar')
        .data(filteredData2)
        .enter()
        .append('rect')
        .attr('width', (d) => d.height_px)
        .attr('height', 20)
        .attr('x', 200)
        .attr('y', (d, i) => (i * 30))
        .on("click", function(e) {
            d3.select('.height')
                .text(e.target.__data__.height_ft)
            
            d3.select('.building-name')
                .text(e.target.__data__.building)

            d3.select('.city')
                .text(e.target.__data__.city)

            d3.select('.country')
                .text(e.target.__data__.country)

            d3.select('.floors')
                .text(e.target.__data__.floors)

            d3.select('.completed')
                .text(e.target.__data__.completed)
            d3.select('.image')
                .attr("src", `img/${e.target.__data__.image}`)
            
        });

    let texts = svg.selectAll('text')
        .data(filteredData2)
        .enter()
    texts
        .append('text')
        .attr('height', 20)
        .attr('x', 0)
        .attr('y', (_, i) => (i * 30) + 10)
        .text((d) => d.building)
        .attr('font-size', 13)

    texts
        .append('text')
        .attr('fill', 'white')
        .attr('x', (d) => 200 + d.height_px)
        .attr('y', (_, i) => (i * 30) + 15)
        .text((d) => {
            return d.height_ft + ' ft'
        })
        .attr('text-anchor', 'end')
        .attr('font-size', 13)
})