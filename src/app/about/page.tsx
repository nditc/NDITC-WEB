import CommonPage from '../Components/CommonPage/CommonPage';
import { FaRegQuestionCircle } from 'react-icons/fa';

const Sections = [
  {
    heading: 'Heading1',
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas laborum iure vero
        enim sequi temporibus, repellendus ipsum, animi ex quidem, officiis alias nostrum explicabo
        odio doloremque. Iure id hic quo iusto delectus nemo consequatur aut est qui doloremque,
        voluptatum soluta voluptate architecto aperiam repellat ex, molestiae veniam pariatur at!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cupiditate quo vel veniam
        fuga omnis aperiam deleniti, ipsum voluptate odit, animi et quos? Nihil ad facere voluptatum
        vero placeat dolores quia voluptates amet labore quisquam reiciendis tempora eum nisi
        deserunt, earum doloribus odio fuga consequuntur explicabo similique! Amet illum delectus
        aliquam nihil impedit officiis laudantium, id aut deserunt aperiam ducimus eum similique
        esse! A amet ex voluptatibus quaerat ullam ea non quidem nulla modi earum tempora
        perspiciatis voluptatem, recusandae totam eaque id eos aspernatur! Asperiores non, ex
        voluptas illum molestias quia, laboriosam enim, sunt eveniet tempora eaque ipsum aperiam
        voluptatem voluptate unde natus assumenda officiis? Quod architecto maiores quis dolorem
        nesciunt deleniti hic natus illum corporis, sint officiis totam eius quos dicta consequuntur
        doloribus dolor animi, vero delectus iusto soluta dolore aperiam ipsa. Pariatur inventore,
        soluta magni ut, est dolorem suscipit quod id doloremque iure sapiente, adipisci corporis
        molestiae ipsam eos. Voluptate ut placeat, quaerat culpa praesentium iusto eos explicabo
        fuga? Quidem similique blanditiis eveniet nostrum quod itaque alias adipisci maxime illum
        nihil. Facere, cumque dolor sed ducimus et tempore ratione delectus voluptas dignissimos
        maiores repudiandae? Distinctio officiis porro modi nisi ipsum hic cupiditate culpa? Quis
        eveniet natus odit? Corrupti.
      </p>
    ),
  },
  {
    heading: 'Heading2',
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas laborum iure vero
        enim sequi temporibus, repellendus ipsum, animi ex quidem, officiis alias nostrum explicabo
        odio doloremque. Iure id hic quo iusto delectus nemo consequatur aut est qui doloremque,
        voluptatum soluta voluptate architecto aperiam repellat ex, molestiae veniam pariatur at!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cupiditate quo vel veniam
        fuga omnis aperiam deleniti, ipsum voluptate odit, animi et quos? Nihil ad facere voluptatum
        vero placeat dolores quia voluptates amet labore quisquam reiciendis tempora eum nisi
        deserunt, earum doloribus odio fuga consequuntur explicabo similique! Amet illum delectus
        aliquam nihil impedit officiis laudantium, id aut deserunt aperiam ducimus eum similique
        esse! A amet ex voluptatibus quaerat ullam ea non quidem nulla modi earum tempora
        perspiciatis voluptatem, recusandae totam eaque id eos aspernatur! Asperiores non, ex
        voluptas illum molestias quia, laboriosam enim, sunt eveniet tempora eaque ipsum aperiam
        voluptatem voluptate unde natus assumenda officiis? Quod architecto maiores quis dolorem
        nesciunt deleniti hic natus illum corporis, sint officiis totam eius quos dicta consequuntur
        doloribus dolor animi, vero delectus iusto soluta dolore aperiam ipsa. Pariatur inventore,
        soluta magni ut, est dolorem suscipit quod id doloremque iure sapiente, adipisci corporis
        molestiae ipsam eos. Voluptate ut placeat, quaerat culpa praesentium iusto eos explicabo
        fuga? Quidem similique blanditiis eveniet nostrum quod itaque alias adipisci maxime illum
        nihil. Facere, cumque dolor sed ducimus et tempore ratione delectus voluptas dignissimos
        maiores repudiandae? Distinctio officiis porro modi nisi ipsum hic cupiditate culpa? Quis
        eveniet natus odit? Corrupti.
      </p>
    ),
  },
  {
    heading: 'Heading2',
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas laborum iure vero
        enim sequi temporibus, repellendus ipsum, animi ex quidem, officiis alias nostrum explicabo
        odio doloremque. Iure id hic quo iusto delectus nemo consequatur aut est qui doloremque,
        voluptatum soluta voluptate architecto aperiam repellat ex, molestiae veniam pariatur at!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum cupiditate quo vel veniam
        fuga omnis aperiam deleniti, ipsum voluptate odit, animi et quos? Nihil ad facere voluptatum
        vero placeat dolores quia voluptates amet labore quisquam reiciendis tempora eum nisi
        deserunt, earum doloribus odio fuga consequuntur explicabo similique! Amet illum delectus
        aliquam nihil impedit officiis laudantium, id aut deserunt aperiam ducimus eum similique
        esse! A amet ex voluptatibus quaerat ullam ea non quidem nulla modi earum tempora
        perspiciatis voluptatem, recusandae totam eaque id eos aspernatur! Asperiores non, ex
        voluptas illum molestias quia, laboriosam enim, sunt eveniet tempora eaque ipsum aperiam
        voluptatem voluptate unde natus assumenda officiis? Quod architecto maiores quis dolorem
        nesciunt deleniti hic natus illum corporis, sint officiis totam eius quos dicta consequuntur
        doloribus dolor animi, vero delectus iusto soluta dolore aperiam ipsa. Pariatur inventore,
        soluta magni ut, est dolorem suscipit quod id doloremque iure sapiente, adipisci corporis
        molestiae ipsam eos. Voluptate ut placeat, quaerat culpa praesentium iusto eos explicabo
        fuga? Quidem similique blanditiis eveniet nostrum quod itaque alias adipisci maxime illum
        nihil. Facere, cumque dolor sed ducimus et tempore ratione delectus voluptas dignissimos
        maiores repudiandae? Distinctio officiis porro modi nisi ipsum hic cupiditate culpa? Quis
        eveniet natus odit? Corrupti.
      </p>
    ),
  },
];

const About = () => {
  return (
    <div>
      <CommonPage
        heading="About Us"
        icon={<FaRegQuestionCircle className={'w-16 h-16'} />}
        sections={Sections}
      />
    </div>
  );
};

export default About;
