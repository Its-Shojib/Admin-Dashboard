
import PropTypes from 'prop-types';
const SectionTitle = ({title, subtitle}) => {
    return (
        <div>
            <section className="text-center my-7 uppercase">
                <h3 className="text-base italic text-blue-900">{subtitle}</h3>
                <h1 className="text-2xl italic text-red-900">{title}</h1>
            </section>
        </div>
    );
};
SectionTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
}
export default SectionTitle;