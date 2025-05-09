import '../App.css';

type PostHeaderProps = {
  businessNames: string[];
  selectedBusiness: string;
  onFilterChange: (value: string) => void;
};

function PostHeader({ businessNames, selectedBusiness, onFilterChange }: PostHeaderProps) {
  return (
    <div className='title'>
      <div className='title-left'>
        <h2>See how AI see <strong>your</strong> site...</h2>
      </div>
      <div className='filter-container'>
      <p></p>
        <select className='custom-dropdown'
          value={selectedBusiness}
          onChange={(e) => onFilterChange(e.target.value)}
        >
         
          {businessNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PostHeader;
