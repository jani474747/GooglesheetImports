const [data, setData] = useState([])
const [loading, setLoading] = useState(true);

const [currentPage, setCurrentPage] = useState(1);
const [recordsPerPage] = useState(10);


useEffect(() => {
    axios.get('MOCK_DATA.json')
        .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert('There was an error while retrieving the data')
            })
}, [])

const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
const nPages = Math.ceil(data.length / recordsPerPage)